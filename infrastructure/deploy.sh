#!/bin/bash

# Quick deployment script for Next.js on ECS with Terraform
# Usage: ./deploy.sh [project-name]

set -e

PROJECT_NAME=${1}
REGION=${AWS_REGION:-eu-west-2}

if [ -z "$PROJECT_NAME" ]; then
    echo "❌ Error: Project name is required"
    echo "Usage: ./deploy.sh <project-name>"
    exit 1
fi

echo "🚀 Deploying $PROJECT_NAME to AWS ECS Fargate with Terraform..."

# Check if terraform.tfvars exists
if [ ! -f "terraform.tfvars" ]; then
    echo "⚠️  terraform.tfvars not found. Creating from example..."
    cp terraform.tfvars.example terraform.tfvars
    echo "📝 Please edit terraform.tfvars with your configuration, then run this script again."
    exit 0
fi

# Step 1: Initialize Terraform
echo "🔧 Initializing Terraform..."
terraform init

# Step 2: Validate configuration
echo "✅ Validating Terraform configuration..."
terraform validate

# Step 3: Plan
echo "📋 Planning infrastructure changes..."
terraform plan -out=tfplan

# Step 4: Ask for confirmation
echo ""
read -p "Do you want to apply these changes? (yes/no): " CONFIRM
if [ "$CONFIRM" != "yes" ]; then
    echo "❌ Deployment cancelled."
    exit 0
fi

# Step 5: Apply
echo "☁️  Applying infrastructure changes..."
terraform apply tfplan
rm -f tfplan

# Step 6: Get outputs
echo ""
echo "✅ Infrastructure deployed successfully!"
echo ""
echo "📋 Outputs:"
terraform output

ECR_URL=$(terraform output -raw ecr_repository_url 2>/dev/null || echo "")
CLUSTER=$(terraform output -raw cluster_name 2>/dev/null || echo "")
SERVICE=$(terraform output -raw service_name 2>/dev/null || echo "")

if [ -n "$ECR_URL" ]; then
    echo ""
    echo "📦 Next steps:"
    echo ""
    echo "1. Build your Docker image:"
    echo "   docker buildx build --platform linux/amd64 -t $PROJECT_NAME ."
    echo ""
    echo "2. Login to ECR:"
    echo "   aws ecr get-login-password --region $REGION | docker login --username AWS --password-stdin $ECR_URL"
    echo ""
    echo "3. Tag and push image:"
    echo "   docker tag $PROJECT_NAME:latest $ECR_URL:latest"
    echo "   docker push $ECR_URL:latest"
    echo ""
    echo "4. Force ECS deployment:"
    echo "   aws ecs update-service --cluster $CLUSTER --service $SERVICE --force-new-deployment --region $REGION"
    echo ""
    echo "5. Monitor deployment:"
    echo "   aws ecs describe-services --cluster $CLUSTER --services $SERVICE --region $REGION"
    echo ""
fi

echo "🎉 Done! Your infrastructure is ready."
