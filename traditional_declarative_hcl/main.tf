terraform {
  required_providers {
    google = {
      source = "hashicorp/google"
      version = "4.44.1"
    }
  }
}

provider "google" {
  credentials = file(var.service_account_key_path)
  project     = var.gcp_project_id
  region      = var.gcp_region
  zone        = var.gcp_zone
}

resource "google_compute_network" "vpc_network" {
  name = "demo-terraform-network-using-hcl"
}
