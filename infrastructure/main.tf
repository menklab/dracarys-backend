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

resource "digitalocean_vpc" "network" {
  name     = format("%s-%s-%s", "dracarys", var.environment, "network")
  region   = "nyc1"
  ip_range = "10.0.0.0/24"
}


resource "digitalocean_droplet" "api_server" {
  image    = "ubuntu-20-04-x64"
  name     = "api_server"
  region   = var.do_region
  size     = var.droplet_size
  vpc_uuid = digitalocean_vpc.network.id
  ssh_keys = var.droplet_initial_ssh_keys
  # Startup script to install node, npm, and pm2 to run the nest app
  user_data = <<EOT
#!/bin/sh

sudo apt update -y
sudo apt install nodejs -y
sudo apt install npm -y
npm install pm2 -g
EOT
}

resource "digitalocean_reserved_ip" "this" {
  droplet_id = digitalocean_droplet.api_server.id
  region     = var.do_region
}

resource "digitalocean_database_cluster" "postgres" {
  name                 = format("%s-%s-%s", "dracarys", var.environment, "db-cluster")
  engine               = "pg"
  version              = "12"
  size                 = var.db_size
  region               = var.do_region
  node_count           = var.db_node_count
  private_network_uuid = digitalocean_vpc.network.id
}

resource "digitalocean_database_cluster" "redis" {
  name                 = format("%s-%s-%s", "dracarys", var.environment, "db-cluster")
  engine               = "redis"
  version              = "7"
  size                 = var.redis_size
  region               = var.do_region
  node_count           = var.redis_node_count
  private_network_uuid = digitalocean_vpc.network.id
}

resource "digitalocean_project" "this" {
  name        = format("%s-%s", "dracarys", var.environment)
  description = "A project to represent dracarys back end resources"
  purpose     = "Service or API"
  environment = var.environment
  resources   = [digitalocean_droplet.api_server.urn, digitalocean_reserved_ip.this.urn, digitalocean_database_cluster.postgres.urn, digitalocean_database_cluster.redis.urn]
}
