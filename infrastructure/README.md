# Dracarys Backend Infrastructure

For the publicly hosted version of the Dracarys backend, we use a Terraform configuration to provision the infrastructure on Digital Ocean.

To see how to contribute to the infrastructure, see [CONTRIBUTING.md](../CONTRIBUTING.md).

## Creating a new environment
1. Create a new branch for the environment in GitHub
2. Create a new workspace for the environment in Terraform Cloud linked to the branch created in step 1
3. Add the necessary variables in the Terraform workspace (see [variables.tf](variables.tf) or the documentation below to see which variables to add), then apply the Terraform configuration to create the infrastructure in Digital Ocean
4. SSH into the Droplet and the following commands to set up the environment:
```
# Install Node, NPM, and pm2
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash

# (follow instructions to add nvm to your path, or restart your shell)

nvm install 16
npm install pm2 -g
echo "module.exports = {
  apps : [{
    name: 'dracarys',
    script: 'app/dist/src/main.js',
    watch: 'app'
  }],
};" > ecosystem.config.js
mkdir app
```
**NOTE: it would be nice to automate this, but it's more difficult to do so in an Ubuntu UserData startup script, since the root user does not exist at the time the script runs, which interferes with the installation of nvm.**

# Root Module Documentation
<!-- BEGIN_TF_DOCS -->
## Requirements

| Name | Version |
|------|---------|
| <a name="requirement_terraform"></a> [terraform](#requirement\_terraform) | ~> 1.3.6 |
| <a name="requirement_digitalocean"></a> [digitalocean](#requirement\_digitalocean) | ~> 2.25.0 |

## Providers

| Name | Version |
|------|---------|
| <a name="provider_digitalocean"></a> [digitalocean](#provider\_digitalocean) | 2.25.2 |

## Modules

No modules.

## Resources

| Name | Type |
|------|------|
| [digitalocean_database_cluster.postgres](https://registry.terraform.io/providers/digitalocean/digitalocean/latest/docs/resources/database_cluster) | resource |
| [digitalocean_database_cluster.redis](https://registry.terraform.io/providers/digitalocean/digitalocean/latest/docs/resources/database_cluster) | resource |
| [digitalocean_droplet.api_server](https://registry.terraform.io/providers/digitalocean/digitalocean/latest/docs/resources/droplet) | resource |
| [digitalocean_project.this](https://registry.terraform.io/providers/digitalocean/digitalocean/latest/docs/resources/project) | resource |
| [digitalocean_reserved_ip.this](https://registry.terraform.io/providers/digitalocean/digitalocean/latest/docs/resources/reserved_ip) | resource |
| [digitalocean_vpc.network](https://registry.terraform.io/providers/digitalocean/digitalocean/latest/docs/resources/vpc) | resource |

## Inputs

| Name | Description | Type | Default | Required |
|------|-------------|------|---------|:--------:|
| <a name="input_db_node_count"></a> [db\_node\_count](#input\_db\_node\_count) | The number of nodes in the postgres database cluster | `number` | `1` | no |
| <a name="input_db_size"></a> [db\_size](#input\_db\_size) | The size of the postgres database cluster | `string` | `"db-s-1vcpu-1gb"` | no |
| <a name="input_do_region"></a> [do\_region](#input\_do\_region) | The region to deploy the infrastructure to | `string` | `"nyc1"` | no |
| <a name="input_do_token"></a> [do\_token](#input\_do\_token) | API token for the Digital Ocean Provider | `string` | n/a | yes |
| <a name="input_droplet_initial_ssh_keys"></a> [droplet\_initial\_ssh\_keys](#input\_droplet\_initial\_ssh\_keys) | The initial SSH key IDs to add to the droplet. NOTE: changing this list will cause a recreation of the droplet - if that's not preferred, add or remove keys from the droplet manually via SSHing into the droplet instead | `list(string)` | n/a | yes |
| <a name="input_droplet_size"></a> [droplet\_size](#input\_droplet\_size) | The size of the droplet | `string` | `"s-1vcpu-512mb-10gb"` | no |
| <a name="input_environment"></a> [environment](#input\_environment) | The environment of the infrastructure. Must be Development, Staging, or Production | `string` | n/a | yes |
| <a name="input_redis_node_count"></a> [redis\_node\_count](#input\_redis\_node\_count) | The number of nodes in the redis cluster | `number` | `1` | no |
| <a name="input_redis_size"></a> [redis\_size](#input\_redis\_size) | The size of the redis cluster | `string` | `"db-s-1vcpu-1gb"` | no |

## Outputs

No outputs.
<!-- END_TF_DOCS -->
