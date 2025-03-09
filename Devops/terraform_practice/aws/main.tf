lprovider "aws"{


        region="eu-north-1"
}

resource "aws_instance" "myos"{
        ami="ami-07a64b147d3500b6a"
        instance_type="t3.micro"
        tags={
                Name="MyTfOS"
}
}

output "myoutput"{
         value=aws_instance.myos.public_ip
}

