provider "aws"{
    region= "eu-north-1"
}

resource "aws_instance" "myweb"{
    ami= "ami-07a64b147d3500b6a"
    instance_type= "t3.micro"
    key_name = "mystock-key"
    security_groups = ["launch-wizard-21"]
    tags={
        Name= "My Web Os"
    }
}