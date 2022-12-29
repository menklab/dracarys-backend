# Contributing to dracarys-backend
## Development Requirements
### Base Requirements
- Clone the repo
- Run `npm install`, then `npm run prepare` to install dependencies and git hooks

### Infrastructure Requirements
- Install [Terraform](https://www.terraform.io/) to provide Infrastructure as Code
- Install [tflint](https://github.com/terraform-linters/tflint) to lint Terraform configuration files
- Install [terraform-docs](https://terraform-docs.io/) to generate documentation from Terraform configuration files
- Run `terraform init` in the `infrastructure` folder to initialize the Terraform configuration

### Code Requirements
- [NestJS](https://nestjs.com/) for the backend

## Contributing to the infrastructure
To contribute bug fixes or new features to the infrastructure:
1. Perform the steps in [Base Requirements](#base-requirements)
2. Perform the steps in [Infrastructure Requirements](#infrastructure-requirements)
4. Make any changes, and commit them. The pre-commit hooks will automatically format, lint, and generate documentation for the Terraform configuration.

**NOTE:** At the time of writing, the terraform configuration doesn't use any sub-modules. If/when it does end up using sub-modules, uncomment the two sections in the pre-commit that only work if sub-modules are present.

## Contributing to the code
To contribute bug fixes or new features to the code:
1. Perform the steps in [Base Requirements](#base-requirements)