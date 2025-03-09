module "mymod" {
  source = "./mymod"
}
output "outmod"{
    value = module.mymod.my-name
}

module "myse-module"{
    source = "./mys3mod"
}

output "bucket"{
    value=module.myse-module.arn
}