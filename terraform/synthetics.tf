provider "newrelic" {
  account_id = var.account_id
  api_key = var.api_key
  admin_api_key = var.admin_api_key
  region = var.region
}


resource "newrelic_synthetics_monitor" "simple_check" {
  name = "Simple Check"
  type = "SIMPLE"
  frequency = 5
  status = "ENABLED"
  bypass_head_request = true
  locations = [
    "AWS_US_EAST_1",
    "AWS_US_EAST_2"]

  uri = "https://newrelic.com"
  verify_ssl = true
}


resource "newrelic_synthetics_monitor" "browser_check" {
  name = "Browser Check"
  type = "BROWSER"
  frequency = 5
  status = "ENABLED"
  locations = [
    "AWS_US_EAST_1"]

  uri = "https://newrelic.com"
}

resource "newrelic_synthetics_monitor" "scripted_browser_check" {
  name = "Scripted Browser Check"
  type = "SCRIPT_BROWSER"
  frequency = 5
  status = "ENABLED"
  locations = [
    "AWS_US_EAST_1"]
}

data "template_file" "scripted_browser_script" {
  template = file("${path.module}/scripts/scripted_browser.js")
}

resource "newrelic_synthetics_monitor_script" "scripted_browser" {
  monitor_id = newrelic_synthetics_monitor.scripted_browser_check.id
  text = data.template_file.scripted_browser_script.rendered
}

resource "newrelic_synthetics_monitor" "api_check" {
  name = "API Check"
  type = "SCRIPT_API"
  frequency = 5
  status = "ENABLED"
  locations = [
    "AWS_US_EAST_1"
  ]
}

data "template_file" "api_script" {
  template = file("${path.module}/scripts/api.js")
}

resource "newrelic_synthetics_monitor_script" "api_check_monitor" {
  monitor_id = newrelic_synthetics_monitor.api_check.id
  text = data.template_file.api_script.rendered
}


resource "newrelic_synthetics_secure_credential" "my_secrets" {
  key = "CERT_PART_1"
  value = "mysecretpassword"
}

resource "newrelic_synthetics_secure_credential" "cert_part_one" {
  key = "CERT_PART_1"
  value = var.cert_part_one
}

resource "newrelic_synthetics_secure_credential" "cert_part_two" {
  key = "CERT_PART_2"
  value = var.cert_part_two
}

resource "newrelic_synthetics_secure_credential" "cert_part_three" {
  key = "CERT_PART_3"
  value = var.cert_part_three
}


resource "newrelic_alert_policy" "synthetics_policy" {
  name = "Synthetics Policy"
  incident_preference = "PER_POLICY"
}

resource "newrelic_synthetics_alert_condition" "simple_check_condition" {
  policy_id = newrelic_alert_policy.synthetics_policy.id

  name        = "Simple Alert Condition"
  monitor_id  = newrelic_synthetics_monitor.simple_check.id
}

resource "newrelic_synthetics_alert_condition" "api_check_condition" {
  policy_id = newrelic_alert_policy.synthetics_policy.id

  name        = "Simple Alert Condition"
  monitor_id  = newrelic_synthetics_monitor.api_check.id
}

resource "newrelic_alert_channel" "email_channel" {
  name = "Idir"
  type = "email"

  config {
    recipients              = "iouhab@newrelic.com"
    include_json_attachment = true
  }
}

resource "newrelic_alert_policy_channel" "foo" {
  policy_id  = newrelic_alert_policy.synthetics_policy.id
  channel_ids = [
    newrelic_alert_channel.email_channel.id
  ]
}