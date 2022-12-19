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
| [digitalocean_project.this](https://registry.terraform.io/providers/digitalocean/digitalocean/latest/docs/resources/project) | resource |

## Inputs

| Name | Description | Type | Default | Required |
|------|-------------|------|---------|:--------:|
| <a name="input_do_token"></a> [do\_token](#input\_do\_token) | API token for the Digital Ocean Provider | `string` | n/a | yes |
| <a name="input_environment"></a> [environment](#input\_environment) | The environment of the infrastructure. Must be Development, Staging, or Production | `string` | n/a | yes |

## Outputs

No outputs.
<!-- END_TF_DOCS -->
