provider "aws"{
    region="eu-north-1"
}

resource "aws_s3_bucket" "my-bucket" {
  bucket="tf-bucket-mod-for-test"
  tags={
    Name="mytf bucket"
  }
}
