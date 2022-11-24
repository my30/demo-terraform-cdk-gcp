variable "service_account_key_path" {
  type = string
  default = "path-to-service-account-key.json"
}

variable "gcp_project_id" {
    type = string
    default = "gcp-project-id"
}

variable "gcp_region" {
    type = string
    default = "europe-west2"
}

variable "gcp_zone" {
    type = string
    default = "europe-west2-c"
}