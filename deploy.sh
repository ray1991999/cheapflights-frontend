#!/bin/bash
set -e

echo "🚀 Deploying CheapFlights to AWS..."

# Build React app
echo "📦 Building React application..."
npm run build

# Sync to S3
echo "☁️ Uploading to S3..."
aws s3 sync build/ s3://$BUCKET_NAME --delete

# Invalidate CloudFront cache
DISTRIBUTION_ID=$(aws cloudfront list-distributions --query "DistributionList.Items[0].Id" --output text)
echo "🔄 Invalidating CloudFront cache..."
aws cloudfront create-invalidation --distribution-id $DISTRIBUTION_ID --paths "/*"

echo "✅ Deployment complete!"
echo "🌐 S3 URL: http://$BUCKET_NAME.s3-website.ca-central-1.amazonaws.com"
echo "🚀 CloudFront URL: https://$(aws cloudfront list-distributions --query "DistributionList.Items[0].DomainName" --output text)"

