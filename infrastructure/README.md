# Dracarys Backend Infrastructure

For the publicly hosted version of the Dracarys backend, we use a Terraform configuration to provision the infrastructure on Digital Ocean.

To see how to contribute to the infrastructure, see [CONTRIBUTING.md](../CONTRIBUTING.md).

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
| [digitalocean_database_cluster.this](https://registry.terraform.io/providers/digitalocean/digitalocean/latest/docs/resources/database_cluster) | resource |
| [digitalocean_droplet.api_server](https://registry.terraform.io/providers/digitalocean/digitalocean/latest/docs/resources/droplet) | resource |
| [digitalocean_project.this](https://registry.terraform.io/providers/digitalocean/digitalocean/latest/docs/resources/project) | resource |
| [digitalocean_reserved_ip.this](https://registry.terraform.io/providers/digitalocean/digitalocean/latest/docs/resources/reserved_ip) | resource |
| [digitalocean_vpc.network](https://registry.terraform.io/providers/digitalocean/digitalocean/latest/docs/resources/vpc) | resource |

## Inputs

| Name | Description | Type | Default | Required |
|------|-------------|------|---------|:--------:|
| <a name="input_db_node_count"></a> [db\_node\_count](#input\_db\_node\_count) | The number of nodes in the database cluster | `number` | `1` | no |
| <a name="input_db_size"></a> [db\_size](#input\_db\_size) | The size of the database cluster | `string` | `"db-s-1vcpu-1gb"` | no |
| <a name="input_do_region"></a> [do\_region](#input\_do\_region) | The region to deploy the infrastructure to | `string` | `"nyc1"` | no |
| <a name="input_do_token"></a> [do\_token](#input\_do\_token) | API token for the Digital Ocean Provider | `string` | n/a | yes |
| <a name="input_droplet_initial_ssh_keys"></a> [droplet\_initial\_ssh\_keys](#input\_droplet\_initial\_ssh\_keys) | The initial SSH keys to add to the droplet. NOTE: changing this list will cause a recreation of the droplet - if that's not preferred, add or remove keys from the droplet manually via SSHing into the droplet instead | `list(string)` | n/a | yes |
| <a name="input_droplet_size"></a> [droplet\_size](#input\_droplet\_size) | The size of the droplet | `string` | `"s-1vcpu-512mb-10gb"` | no |
| <a name="input_environment"></a> [environment](#input\_environment) | The environment of the infrastructure. Must be Development, Staging, or Production | `string` | n/a | yes |

## Outputs

No outputs.
<!-- END_TF_DOCS -->
