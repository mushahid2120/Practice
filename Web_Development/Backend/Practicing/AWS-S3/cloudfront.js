import { CloudFrontClient, CreateInvalidationCommand, ListCachePoliciesCommand } from "@aws-sdk/client-cloudfront";

const cloudfrontClient=new CloudFrontClient({profile: 'mushahid'})
const command =new CreateInvalidationCommand({
    DistributionId: 'E2OXZ4M82V70KS',
    InvalidationBatch:{CallerReference: "123",Paths: {
        Quantity:1,Items: ["/image.jpg"]
    }}
})

const response=await cloudfrontClient.send(command )
console.log(response)