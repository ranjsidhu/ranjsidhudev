variable "aws_region" {
  description = "AWS region to deploy to"
  type        = string
  default     = "eu-west-2"
}

variable "project_name" {
  description = "Project name - used for naming all resources"
  type        = string
}

variable "use_managed_certificate" {
  description = "Use Terraform-managed ACM certificate for ALB HTTPS listener"
  type        = bool
  default     = true
}

variable "cloudflare_zone_id" {
  description = "Cloudflare zone ID for DNS validation records"
  type        = string
  default     = ""
}

variable "domain_name" {
  description = "Domain name for the application"
  type        = string
  default     = ""
}

variable "subdomain" {
  description = "Subdomain for the application (optional)"
  type        = string
  default     = ""
}

variable "desired_count" {
  description = "Number of tasks to run"
  type        = number
  default     = 2
}

variable "cpu" {
  description = "CPU units for the task (256, 512, 1024, 2048, 4096)"
  type        = number
  default     = 512
}

variable "memory" {
  description = "Memory for the task in MB"
  type        = number
  default     = 1024
}

variable "container_port" {
  description = "Port the container listens on"
  type        = number
  default     = 3000
}

variable "enable_spot" {
  description = "Enable Fargate Spot for cost savings"
  type        = bool
  default     = true
}

variable "environment_variables" {
  description = "Additional environment variables for the container"
  type = list(object({
    name  = string
    value = string
  }))
  default = []
}
