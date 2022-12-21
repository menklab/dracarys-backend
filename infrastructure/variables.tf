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

variable "do_region" {
  type        = string
  description = "The region to deploy the infrastructure to"
  default     = "nyc1"
}

variable "db_size" {
  type        = string
  description = "The size of the database cluster"
  default     = "db-s-1vcpu-1gb" # Default is meant for development only
}

variable "db_node_count" {
  type        = number
  description = "The number of nodes in the database cluster"
  default     = 1 # Default is meant for development only
}

variable "droplet_size" {
  type        = string
  description = "The size of the droplet"
  default     = "s-1vcpu-512mb-10gb" # Default is meant for development only
}

variable "droplet_initial_ssh_keys" {
  type        = list(string)
  description = "The initial SSH key IDs to add to the droplet. NOTE: changing this list will cause a recreation of the droplet - if that's not preferred, add or remove keys from the droplet manually via SSHing into the droplet instead"
}