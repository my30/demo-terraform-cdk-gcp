// Copyright (c) HashiCorp, Inc
// SPDX-License-Identifier: MPL-2.0
import { Construct } from "constructs";
import { App, TerraformOutput, TerraformStack } from "cdktf";

// .gen is generated after running cdktf get.
import { GoogleProvider } from "./.gen/providers/google/provider"
import { ComputeNetwork } from "./.gen/providers/google/compute-network"

class MyStack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    // define resources here
    const serviceAccountKeyPath = "path_to_service_account_key.json";
    const gcpProjectId = "target_gcp_project_id";
    const gcpRegion = "europe-west2";

    new GoogleProvider(this, "google", {
      credentials: serviceAccountKeyPath,
      project: gcpProjectId,
      region: gcpRegion,
      zone: gcpRegion + "-2b"
    });

    const vpcnetworkapp = new ComputeNetwork(this, "vpc_network", {
      name: "demo-terraform-network-using-cdktf",
    });

    new TerraformOutput(this, "gateWayIP", {
      value: vpcnetworkapp.autoCreateSubnetworks
    });
  }
}

const app = new App();
new MyStack(app, "demo-terraform-cdk-gcp");
app.synth();
