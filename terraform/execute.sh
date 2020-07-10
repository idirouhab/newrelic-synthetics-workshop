#!/bin/bash

while getopts "a:f:" opt; do
  case $opt in
  a) action=$OPTARG ;;
  *)
    echo 'error' >&2
    exit 1
    ;;
  esac
done

var=$(cat /certs/server.crt | base64)
export TF_VAR_cert_part_one=${var:0:${#var}/3}
export TF_VAR_cert_part_two=${var:${#var}/3*2}
export TF_VAR_cert_part_three=${var:${#var}/3*2:${#var}}

if [ "$action" == "apply" ]; then
  terraform apply --auto-approve
else
  terraform destroy --auto-approve
fi
