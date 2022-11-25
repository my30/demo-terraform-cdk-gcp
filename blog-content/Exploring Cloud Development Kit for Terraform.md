# Exploring Cloud Development Kit for Terraform

Tags: GCP, Terraform, TypeScript, CDK

# Key Takeaways

<aside>
When to use CDKTF?

CDKTF offers many benefits, but it is not the right choice for every project. You should consider using CDKTF when:

- You have a strong preference or need to use a procedural language to define infrastructure.
- You need to create abstractions to help manage complexity. For example, you want to create constructs to model a reusable infrastructure pattern composed of multiple resources and convenience methods.
- You are comfortable doing your own troubleshooting and do not require commercial support.

CDKTF may not be the right choice for every team and project within your organization. For example, some teams may already be very familiar with Terraform and have created HCL modules, providers, etc. To provide flexibility, CDKTF applications are interoperable with Terraform projects written in HCL. Specifically:

- CDKTF applications can use all existing Terraform **[providers](https://developer.hashicorp.com/terraform/cdktf/concepts/providers)** and HCL **[modules](https://developer.hashicorp.com/terraform/cdktf/concepts/modules)**.
- CDKTF can generate modules that HCL Terraform projects can use in their configurations.
</aside>

# Command Executed: a workflow

Installing terraform

```bash
brew tap hashicorp/tap
brew install hashicorp/tap/terraform # At the time of writing, Terraform 1.3.5 was installed

# One can upgrade terraform by running the following
brew update # This updates Homebrew
brew upgrade hashicorp/tap/terraform
```

Installation of Terraform on Linux/Windows can be found here: [https://developer.hashicorp.com/terraform/tutorials/aws-get-started/install-cli#install-terraform](https://developer.hashicorp.com/terraform/tutorials/aws-get-started/install-cli#install-terraform)

Since we are using TypeScript in the example, we’ll need Node.js (v16+) and npm (v9.1.2 is the latest version at the time of writing). Reference on installing those: [https://docs.npmjs.com/downloading-and-installing-node-js-and-npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

Install TypeScript in Visual Studio Code: [https://www.typescriptlang.org/download](https://www.typescriptlang.org/download)

Install latest stable release of CDKTF by running

```bash
npm install --global cdktf-cli@latest
```

## Local Docker

Install Docker. In VS Code, open a new terminal. Browse to a directory that you’d like the project to be, and run

```bash
cdktf init --template=typescript --local
cdktf provider add kreuzwerker/docker
```

Edit the `[main.tf](http://main.tf)` file and paste the code below

```tsx
import { Construct } from "constructs";
import { App, TerraformStack } from "cdktf";
import { DockerProvider } from "@cdktf/provider-docker/lib/provider";
import { Image } from "@cdktf/provider-docker/lib/image";
import { Container } from "@cdktf/provider-docker/lib/container";

class MyStack extends TerraformStack {
  constructor(scope: Construct, name: string) {
    super(scope, name);

    new DockerProvider(this, "docker", {});

    const dockerImage = new Image(this, "nginxImage", {
      name: "nginx:latest",
      keepLocally: false,
    });

    new Container(this, "nginxContainer", {
      name: "tutorial",
      image: dockerImage.latest,
      ports: [
        {
          internal: 80,
          external: 8000,
        },
      ],
    });
  }
}

const app = new App();
new MyStack(app, "learn-cdktf-docker");
app.synth();
```

The code above is equivalent to the following written in HCL:

```json
resource "docker_image" "nginx" {
  name         = "nginx:latest"
  keep_locally = false
}

resource "docker_container" "nginx" {
  image = docker_image.nginx.latest
  name  = "tutorial"
  ports {
    internal = 80
    external = 8000
  }
}

```

Then deploy the container:

```bash
cdktf deploy
```

When finished playing, destroy the container:

```bash
cdktf destroy
```

## GCP

Have a new folder; run `cdktf init`

![Screenshot 2022-11-24 at 15.31.49.png](Exploring%20Cloud%20Development%20Kit%20for%20Terraform%2049d5b04580b743e0a3f845a67a873d74/Screenshot_2022-11-24_at_15.31.49.png)

Choose Google as the Provider

![Screenshot 2022-11-24 at 15.44.24.png](Exploring%20Cloud%20Development%20Kit%20for%20Terraform%2049d5b04580b743e0a3f845a67a873d74/Screenshot_2022-11-24_at_15.44.24.png)

![Screenshot 2022-11-24 at 15.45.31.png](Exploring%20Cloud%20Development%20Kit%20for%20Terraform%2049d5b04580b743e0a3f845a67a873d74/Screenshot_2022-11-24_at_15.45.31.png)

In `cdktf.json`, set 

```
*"terraformProviders"*: ["google@ 4.44.1"]
```

Then run the following to downloads the providers and modules for an application and generates CDK constructs for them.

```bash
cdktf get
```

# Contents of the Blog

## What is CDKTF?

### A bit about terraform

<aside>
💡 Terraform requires infrastructure configuration files written in either **[HashiCorp Configuration Language (HCL)](https://developer.hashicorp.com/terraform/language/syntax/configuration)**
 or JSON syntax. CDK for Terraform (CDKTF) works by translating configurations defined in an imperative programming language to JSON configuration files for Terraform.

</aside>

### History of CDKTF

## Why use CDKTF? Benefits and Pitfalls?