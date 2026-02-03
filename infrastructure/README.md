# Next.js on AWS ECS Fargate - Terraform Template

A production-ready Terraform template for deploying Next.js applications to AWS ECS Fargate with Application Load Balancer, SSL, custom domains, and Fargate Spot for cost optimization.

## Features

- ✅ **ECS Fargate** - Serverless containers, no EC2 management
- ✅ **Fargate Spot** - Save ~70% on compute costs
- ✅ **Application Load Balancer** - With health checks and auto-scaling
- ✅ **SSL/TLS** - Automatic certificate creation and HTTPS
- ✅ **Custom Domains** - Route53 integration
- ✅ **Auto-scaling** - Based on CPU utilization
- ✅ **CloudWatch Logs** - Automatic log retention
- ✅ **ECR** - Private container registry
- ✅ **Multi-AZ** - High availability across availability zones

## Prerequisites

- AWS Account
- AWS CLI configured (`aws configure`)
- Terraform >= 1.0 installed
- Docker installed
- Your Next.js app with `output: 'standalone'` in next.config.js

## Installation

### Install Terraform

**macOS:**
```bash
brew install terraform
```

**Linux:**
```bash
wget https://releases.hashicorp.com/terraform/1.7.0/terraform_1.7.0_linux_amd64.zip
unzip terraform_1.7.0_linux_amd64.zip
sudo mv terraform /usr/local/bin/
```

**Windows:**
Download from https://www.terraform.io/downloads

Verify installation:
```bash
terraform version
```

## Quick Start

### 1. Clone or Download This Template

```bash
# If you have this as a repo
git clone <your-repo>
cd terraform

# Or just create a directory with these files
mkdir my-app-infra && cd my-app-infra
# Copy all .tf files here
```

### 2. Create terraform.tfvars

```bash
cp terraform.tfvars.example terraform.tfvars
```

Edit `terraform.tfvars`:

```hcl
project_name = "myapp"
aws_region   = "eu-west-2"

# Optional: Add domain
# domain_name    = "example.com"
# subdomain      = "app"
# hosted_zone_id = "Z1234567890ABC"

# Optional: Customize resources
# desired_count = 2
# cpu           = 512
# memory        = 1024
# enable_spot   = true
```

### 3. Initialize Terraform

```bash
terraform init
```

### 4. Plan Your Infrastructure

```bash
terraform plan
```

Review what will be created.

### 5. Deploy

```bash
terraform apply
```

Type `yes` when prompted.

### 6. Build and Push Docker Image

After deployment completes:

```bash
# Get ECR repository URL from output
ECR_URL=$(terraform output -raw ecr_repository_url)
REGION=$(terraform output -raw aws_region || echo "eu-west-2")

# Login to ECR
aws ecr get-login-password --region $REGION | docker login --username AWS --password-stdin $ECR_URL

# Build for AMD64
docker buildx build --platform linux/amd64 -t myapp .

# Tag and push
docker tag myapp:latest $ECR_URL:latest
docker push $ECR_URL:latest
```

### 7. Force ECS Deployment

```bash
CLUSTER=$(terraform output -raw cluster_name)
SERVICE=$(terraform output -raw service_name)
REGION=$(terraform output -raw aws_region || echo "eu-west-2")

aws ecs update-service \
  --cluster $CLUSTER \
  --service $SERVICE \
  --force-new-deployment \
  --region $REGION
```

### 8. Access Your App

```bash
# Get the URL
terraform output application_url
```

Visit the URL in your browser!

## Configuration

### Required Variables

```hcl
project_name = "myapp"  # Used for naming all resources
aws_region   = "eu-west-2"
```

### Optional Variables

```hcl
# Domain configuration
domain_name    = "example.com"     # Your domain
subdomain      = "app"             # Subdomain (app.example.com)
hosted_zone_id = "Z1234567890"     # Route53 hosted zone ID

# Or use existing certificate
certificate_arn = "arn:aws:acm:..."

# Resource configuration
desired_count  = 2                  # Number of tasks
cpu            = 512                # CPU units
memory         = 1024               # Memory in MB
container_port = 3000               # App port
enable_spot    = true               # Use Fargate Spot

# Custom environment variables
environment_variables = [
  {
    name  = "API_URL"
    value = "https://api.example.com"
  }
]
```

## Cost Optimization

### Fargate Spot Strategy

When `enable_spot = true`:
- **80% of tasks** run on Spot (cheap)
- **20% of tasks** run on On-Demand (reliable)
- Minimum of 1 task always on On-Demand

### Estimated Monthly Costs

**Without Spot:**
- 2 tasks (0.5 vCPU, 1GB): ~$15-20
- ALB: ~$16-20
- Data transfer: ~$5-10
- **Total: ~$36-50/month**

**With Spot:**
- 2 tasks with 50% Spot: ~$8-12
- ALB: ~$16-20
- Data transfer: ~$5-10
- **Total: ~$29-42/month**

## CI/CD Integration

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to AWS

on:
  push:
    branches: [main]

env:
  AWS_REGION: eu-west-2
  ECR_REPOSITORY: myapp-ecr

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v2
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: ${{ env.AWS_REGION }}

      - name: Login to ECR
        id: login-ecr
        uses: aws-actions/amazon-ecr-login@v1

      - name: Build and push
        env:
          ECR_REGISTRY: ${{ steps.login-ecr.outputs.registry }}
          IMAGE_TAG: ${{ github.sha }}
        run: |
          docker buildx build --platform linux/amd64 -t $ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG .
          docker buildx build --platform linux/amd64 -t $ECR_REGISTRY/$ECR_REPOSITORY:latest .
          docker push $ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG
          docker push $ECR_REGISTRY/$ECR_REPOSITORY:latest

      - name: Deploy to ECS
        run: |
          aws ecs update-service \
            --cluster myapp-cluster \
            --service myapp-service \
            --force-new-deployment \
            --region ${{ env.AWS_REGION }}

      - name: Wait for deployment
        run: |
          aws ecs wait services-stable \
            --cluster myapp-cluster \
            --services myapp-service \
            --region ${{ env.AWS_REGION }}
```

## Domain Setup

### With Route53

Set these variables:
```hcl
domain_name    = "example.com"
subdomain      = "app"
hosted_zone_id = "Z1234567890ABC"
```

Terraform will automatically:
1. Create ACM certificate
2. Validate via DNS
3. Create A record
4. Set up HTTPS redirect

### With External DNS (Cloudflare, etc.)

1. Deploy without `hosted_zone_id`
2. Get ALB DNS: `terraform output alb_dns_name`
3. Create CNAME in your DNS:
   - Name: `app`
   - Value: `<alb-dns-name>`
4. For Cloudflare: Enable orange cloud for CDN

## Useful Commands

```bash
# Initialize
terraform init

# See what will change
terraform plan

# Apply changes
terraform apply

# Destroy everything
terraform destroy

# Show outputs
terraform output

# Format code
terraform fmt

# Validate configuration
terraform validate

# Show current state
terraform show
```

## Outputs

After `terraform apply`, get outputs:

```bash
# ECR repository URL
terraform output ecr_repository_url

# ALB DNS name
terraform output alb_dns_name

# Application URL
terraform output application_url

# Cluster name
terraform output cluster_name

# Service name
terraform output service_name
```

## Troubleshooting

### Container won't start

Check CloudWatch logs:
```bash
aws logs tail /ecs/myapp --follow --region eu-west-2
```

### Can't pull image

Verify:
1. Image exists in ECR
2. Task execution role has ECR permissions
3. Image is tagged correctly

```bash
aws ecr describe-images --repository-name myapp-ecr --region eu-west-2
```

### Health checks failing

- App must respond on port 3000 (or configured port)
- App must return HTTP 200 on `/`
- Check security groups allow ALB → ECS traffic

### Certificate validation stuck

DNS records should auto-create. Check:
```bash
terraform state show aws_route53_record.cert_validation
```

## State Management

### Local State (Default)

State is stored locally in `terraform.tfstate`. **Do not commit this file!**

### Remote State (Recommended for Teams)

Use S3 backend. Create `backend.tf`:

```hcl
terraform {
  backend "s3" {
    bucket = "my-terraform-state-bucket"
    key    = "myapp/terraform.tfstate"
    region = "eu-west-2"
    
    # Optional: Enable state locking
    dynamodb_table = "terraform-state-lock"
    encrypt        = true
  }
}
```

Then migrate:
```bash
terraform init -migrate-state
```

## Multiple Environments

Create separate `.tfvars` files:

**production.tfvars:**
```hcl
project_name  = "myapp-prod"
domain_name   = "myapp.com"
desired_count = 4
cpu           = 1024
memory        = 2048
```

**staging.tfvars:**
```hcl
project_name  = "myapp-staging"
subdomain     = "staging"
domain_name   = "myapp.com"
desired_count = 2
```

Deploy:
```bash
terraform apply -var-file="production.tfvars"
terraform apply -var-file="staging.tfvars"
```

## Updating Infrastructure

1. Modify `.tf` files or `terraform.tfvars`
2. Run `terraform plan` to review changes
3. Run `terraform apply` to apply changes

## Security Best Practices

- ✅ Don't commit `terraform.tfvars` or `.tfstate` files
- ✅ Use remote state with encryption
- ✅ Enable MFA for AWS account
- ✅ Use least-privilege IAM roles
- ✅ Enable CloudWatch logging
- ✅ Regularly update Terraform and providers

## .gitignore

Add to `.gitignore`:

```
# Terraform
*.tfstate
*.tfstate.*
.terraform/
.terraform.lock.hcl
terraform.tfvars
*.tfvars

# Sensitive
.env
*.pem
*.key
```

## Cleaning Up

To destroy all resources:

```bash
terraform destroy
```

**Note:** ECR repository has `prevent_destroy = true` to avoid accidentally deleting images. To delete it:
1. Remove the lifecycle block from `main.tf`
2. Run `terraform destroy` again

## Next.js Configuration

Ensure `next.config.js` has:

```javascript
module.exports = {
  output: 'standalone',
}
```

## Dockerfile Example

```dockerfile
FROM node:18-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"
CMD ["node", "server.js"]
```

## Contributing

PRs welcome! This template is designed to be reusable across projects.

## License

MIT
