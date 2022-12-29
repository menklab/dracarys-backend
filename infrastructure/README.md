# Dracarys Backend Infrastructure

For the publicly hosted version of the Dracarys backend, we use a Terraform configuration to provision the infrastructure on Digital Ocean.

To see how to contribute to the infrastructure, see [CONTRIBUTING.md](../CONTRIBUTING.md).

## Creating a new environment
1. Create a new branch for the environment in GitHub
2. Create a new workspace for the environment in Terraform Cloud linked to the branch created in step 1
3. Add the necessary variables in the Terraform workspace (see [variables.tf](variables.tf) or the documentation below to see which variables to add), then apply the Terraform configuration to create the infrastructure in Digital Ocean
4. Add a deployment target in the [ecosystem.config.js](../ecosystem.config.js) file for the environment (you can just copy and paste the existing dev one and just change the name and the host)
5. SSH into the Droplet and the following commands to set up the environment:
```
# Install Node, NPM, and pm2
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash

# (follow instructions to add nvm to your path, or restart your shell)

nvm install 16
npm install pm2 -g

# add symlinks for npm, node, and pm2 to /usr/bin, needed for pm2 deployments. Note that you'll have to update this symlink if you change the node version
whereis node
ln -s [path found from the above command] /usr/bin/node
whereis npm
ln -s [path found from the above command] /usr/bin/npm
whereis pm2
ln -s [path found from the above command] /usr/bin/pm2

# install doppler CLI and authenticate so that the deployment can access the secrets
# Install pre-reqs
sudo apt-get update && sudo apt-get install -y apt-transport-https ca-certificates curl gnupg

# Add Doppler's GPG key
curl -sLf --retry 3 --tlsv1.2 --proto "=https" 'https://packages.doppler.com/public/cli/gpg.DE2A7741A397C129.key' | sudo apt-key add -

# Add Doppler's apt repo
echo "deb https://packages.doppler.com/public/cli/deb/debian any-version main" | sudo tee /etc/apt/sources.list.d/doppler-cli.list

# Fetch and install latest doppler cli
sudo apt-get update && sudo apt-get install -y doppler

# Click on the relevant environment in Doppler, then click on the "Access" tab, and generate a new readonly service token. Copy the token and run the following commands to authenticate:
# Prevent configure command being leaked in bash history
export HISTIGNORE='doppler*'

# Scope to location of application directory
echo 'TOKEN_YOU_GENERATED' | doppler configure set token --scope /var/www/dracarys-backend

```
**NOTE: it would be nice to automate this, but it's more difficult to do so in an Ubuntu UserData startup script, since the root user does not exist at the time the script runs, which interferes with the installation of nvm.**

## Deploying and Operating the Application
Locally (or in CI/CD script), install pm2 globally:
npm install pm2 -g

To deploy (run this locally or in CI/CD script - note you'll need to have ):
pm2 setup dev
pm2 deploy dev --force

To view logs (run this on the remote server):
pm2 logs --only dracarys-backend

To stop (run this on the remote server) (to reverse this, redeploy the app, as it will start it automatically): 
pm2 stop ecosystem.config.js --only dracarys-backend

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
| <a name="input_droplet_size"></a> [droplet\_size](#input\_droplet\_size) | The size of the droplet | `string` | `"s-1vcpu-1gb"` | no |
| <a name="input_environment"></a> [environment](#input\_environment) | The environment of the infrastructure. Must be Development, Staging, or Production | `string` | n/a | yes |
| <a name="input_redis_node_count"></a> [redis\_node\_count](#input\_redis\_node\_count) | The number of nodes in the redis cluster | `number` | `1` | no |
| <a name="input_redis_size"></a> [redis\_size](#input\_redis\_size) | The size of the redis cluster | `string` | `"db-s-1vcpu-1gb"` | no |

## Outputs

No outputs.
<!-- END_TF_DOCS -->
