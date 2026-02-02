#!/bin/bash

# Script to destroy manually created AWS infrastructure
# This removes the existing setup so Terraform can create fresh resources

set -e

REGION="eu-west-2"
CLUSTER_NAME="ranjsidhudev-cluster"
SERVICE_NAME="ranjsidhudev-service"
ALB_NAME="ranjsidhudev-alb"
TARGET_GROUP_NAME="ranjsidhudev-targets"
ECS_SG_NAME="ranjsidhudev-ecs-sg"
ALB_SG_NAME="ranjsidhudev-alb-sg"

echo "🗑️  Starting infrastructure cleanup..."
echo ""

# Step 1: Delete ECS Service
echo "1️⃣  Deleting ECS service: $SERVICE_NAME"
if aws ecs describe-services --cluster $CLUSTER_NAME --services $SERVICE_NAME --region $REGION &>/dev/null; then
    aws ecs delete-service --cluster $CLUSTER_NAME --service $SERVICE_NAME --force --region $REGION
    echo "✅ Service deleted (tasks draining...)"
    echo "⏳ Waiting 30 seconds for tasks to drain..."
    sleep 30
else
    echo "ℹ️  Service not found, skipping"
fi
echo ""

# Step 2: Delete ECS Cluster
echo "2️⃣  Deleting ECS cluster: $CLUSTER_NAME"
if aws ecs describe-clusters --clusters $CLUSTER_NAME --region $REGION --query 'clusters[0].status' --output text 2>/dev/null | grep -q "ACTIVE"; then
    aws ecs delete-cluster --cluster $CLUSTER_NAME --region $REGION
    echo "✅ Cluster deleted"
else
    echo "ℹ️  Cluster not found, skipping"
fi
echo ""

# Step 3: Delete ALB listeners and ALB
echo "3️⃣  Deleting ALB: $ALB_NAME"
ALB_ARN=$(aws elbv2 describe-load-balancers --names $ALB_NAME --region $REGION --query 'LoadBalancers[0].Arn' --output text 2>/dev/null || echo "")

if [ -n "$ALB_ARN" ] && [ "$ALB_ARN" != "None" ]; then
    echo "   Deleting ALB listeners..."
    LISTENER_ARNS=$(aws elbv2 describe-listeners --load-balancer-arn $ALB_ARN --region $REGION --query 'Listeners[].ListenerArn' --output text 2>/dev/null || echo "")
    
    if [ -n "$LISTENER_ARNS" ]; then
        for LISTENER_ARN in $LISTENER_ARNS; do
            aws elbv2 delete-listener --listener-arn $LISTENER_ARN --region $REGION 2>/dev/null || true
        done
        echo "   ✅ Listeners deleted"
    fi
    
    echo "   Deleting load balancer..."
    aws elbv2 delete-load-balancer --load-balancer-arn $ALB_ARN --region $REGION
    echo "✅ ALB deleted"
    echo "⏳ Waiting 30 seconds for ALB to fully delete..."
    sleep 30
else
    echo "ℹ️  ALB not found, skipping"
fi
echo ""

# Step 4: Delete Target Group
echo "4️⃣  Deleting target group: $TARGET_GROUP_NAME"
TG_ARN=$(aws elbv2 describe-target-groups --names $TARGET_GROUP_NAME --region $REGION --query 'TargetGroups[0].TargetGroupArn' --output text 2>/dev/null || echo "")

if [ -n "$TG_ARN" ] && [ "$TG_ARN" != "None" ]; then
    aws elbv2 delete-target-group --target-group-arn $TG_ARN --region $REGION
    echo "✅ Target group deleted"
else
    echo "ℹ️  Target group not found, skipping"
fi
echo ""

# Step 5: Delete Security Groups
echo "5️⃣  Deleting security groups..."

# Delete ECS security group
ECS_SG_ID=$(aws ec2 describe-security-groups --filters "Name=group-name,Values=$ECS_SG_NAME" --region $REGION --query 'SecurityGroups[0].GroupId' --output text 2>/dev/null || echo "")
if [ -n "$ECS_SG_ID" ] && [ "$ECS_SG_ID" != "None" ]; then
    aws ec2 delete-security-group --group-id $ECS_SG_ID --region $REGION
    echo "   ✅ ECS security group deleted"
else
    echo "   ℹ️  ECS security group not found"
fi

# Delete ALB security group
ALB_SG_ID=$(aws ec2 describe-security-groups --filters "Name=group-name,Values=$ALB_SG_NAME" --region $REGION --query 'SecurityGroups[0].GroupId' --output text 2>/dev/null || echo "")
if [ -n "$ALB_SG_ID" ] && [ "$ALB_SG_ID" != "None" ]; then
    aws ec2 delete-security-group --group-id $ALB_SG_ID --region $REGION
    echo "   ✅ ALB security group deleted"
else
    echo "   ℹ️  ALB security group not found"
fi
echo ""

echo "🎉 Cleanup complete!"
echo ""
echo "Now you can run: terraform apply"