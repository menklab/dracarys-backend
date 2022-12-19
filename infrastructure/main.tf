terraform {
  required_providers {
    digitalocean = {
      source  = "digitalocean/digitalocean"
      version = "~> 2.25.0"
    }
  }

  required_version = "~> 1.3.6"
}

provider "digitalocean" {
  token = var.do_token
}

resource "digitalocean_project" "this" {
  name        = format("%s-%s", "dracarys", var.environment)
  description = "A project to represent dracarys back end resources"
  purpose     = "Service or API"
  environment = var.environment
}