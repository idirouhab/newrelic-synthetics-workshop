# New Relic Synthetics Workshop

## Interacting with the Rest API
All the resources are located under tha `api` folder

### How to install
```
$ npm install
$ node index.js list
$ node index.js create
$ node index.js delete <MONITOR_ID>
$ node index.js update <MONITOR_ID>
```

Inside the `payloads` folder are the JSON templates

[New Relic API Explorer](https://rpm.newrelic.com/api/explore)


## New Relic and Terraform (New Relic Graphql API)
All the resources are located under tha `terraform` folder

### How to install

Export the New Relic account id, New Relic Api Key and New Relic Admin API KEY.<br/>
[Types of New Relic API keys](https://docs.newrelic.com/docs/apis/get-started/intro-apis/types-new-relic-api-keys)
```shell script
TF_VAR_account_id=
TF_VAR_api_key=
TF_VAR_admin_api_key=
```
and then:
```
$ terraform init
$ terraform plan
$ ./execute.sh apply
$ ./execute.sh destroy
```

[New Relic Terraform Resource](https://registry.terraform.io/providers/newrelic/newrelic/latest/docs/resources/synthetics_monitor)