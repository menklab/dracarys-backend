variable "do_token" {
  type        = string
  description = "API token for the Digital Ocean Provider"
  sensitive   = true
}

variable "environment" {
  type        = string
  description = "The environment of the infrastructure. Must be Development, Staging, or Production"
  validation {
    condition     = contains(["Development", "Staging", "Production"], var.environment)
    error_message = "The environment must be Development, Staging, or Production"
  }
}