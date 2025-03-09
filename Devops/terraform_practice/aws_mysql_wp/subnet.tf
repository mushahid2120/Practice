resource "aws_subnet" "mypublic_subnet_1a" {
    vpc_id=aws_vpc.myvpc.id
    availability_zone = "eu-north-1a"
    cidr_block = "10.0.1.0/24"
    tags={
        Name="My Pub 1a"
    }
  map_public_ip_on_launch = true
}

resource "aws_subnet" "mypublic_subnet_1b" {
    vpc_id=aws_vpc.myvpc.id
    availability_zone = "eu-north-1b"
    cidr_block = "10.0.2.0/24"
    tags={
        Name="My Pub 1b"
    }
  map_public_ip_on_launch = true
}

resource "aws_subnet" "myprivate_subnet_1a" {
    vpc_id=aws_vpc.myvpc.id
    availability_zone = "eu-north-1a"
    cidr_block = "10.0.3.0/24"
    tags={
        Name="My Pri 1a"
    }
  map_public_ip_on_launch = false
}

resource "aws_subnet" "myprivate_subnet_1b" {
    vpc_id=aws_vpc.myvpc.id
    availability_zone = "eu-north-1b"
    cidr_block = "10.0.4.0/24"
    tags={
        Name="My Pri 1b"
    }
  map_public_ip_on_launch = false
}