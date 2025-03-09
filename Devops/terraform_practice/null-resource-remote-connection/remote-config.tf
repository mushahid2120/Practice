
resource "null_resource" "nullrem" {
    provisioner "remote-exec"{
        inline= [
            "sudo mkfs.xfs /dev/nvme1n1",
            "sudo yum install httpd -y",
            "sudo mount /dev/nvme1n1 /var/www/html",
            "sudo sh -c 'echo Welcome > /var/www/html/index.html'",
            "sudo systemctl restart httpd"
        ]
    }
    connection{
        type="ssh"
        user="ec2-user"
        private_key = file("C:/Users/saba ahmad/Downloads/aws-key/mystock-key.pem")
        host= aws_instance.myweb.public_ip
    }
}