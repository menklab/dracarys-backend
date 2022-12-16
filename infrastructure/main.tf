terraform {
  required_providers {
    digitalocean = {
      source = "digitalocean/digitalocean"
      version = "~> 2.25.0"
    }
  }
}

provider "digitalocean" {
  token = var.do_token
}

resource "digitalocean_project" "" {
  name        = format("%s-%s", var.environment, "dracarys")
  description = "A project to represent development resources"
  purpose     = "Service or API"
  environment = var.environment
}