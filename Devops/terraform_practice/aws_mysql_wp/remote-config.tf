
resource "null_resource" "null-remote"{
    provisioner "remote-exec" {
      inline = [ 
        "sudo yum install httpd git -y",
        "sudo amazon-linux-extras install -y mariadb10.5 php8.2",
        "sudo git clone https://github.com/WordPress/WordPress.git",
        "sudo mv WordPress/* /var/www/html/",
        "sudo chown -R apache /var/www/html",
        "sudo systemctl restart httpd"
       ]
    }

    connection{
        type="ssh"
        user="ec2-user"
         private_key = file("C:/Users/saba ahmad/Downloads/aws-key/mystock-key.pem")
        host= aws_instance.mywordpress.public_ip
    }
    depends_on = [ aws_instance.mywordpress ]
}