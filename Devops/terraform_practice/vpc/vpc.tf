provider "aws" {
    region="eu-north-1"
}

resource "aws_vpc" "myvpc" {
    cidr_block="10.0.0.0/16"  
    enable_dns_hostnames = true
    enable_dns_support = true
    tags={
        Name="MyTFVPC"
    }
}