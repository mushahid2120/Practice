// Input: nums = [1,2,3,4,5,6,7], k = 3
// Output: [5,6,7,1,2,3,4]
// Explanation:
// rotate 1 steps to the right: [7,1,2,3,4,5,6]
// rotate 2 steps to the right: [6,7,1,2,3,4,5]
// rotate 3 steps to the right: [5,6,7,1,2,3,4]

public class RotateLeftByK {
    public static void main(String[] args) {
        int[]nums={1,2,3,4,5,6,7};
        int k=3;
        k=k%nums.length;
        // System.out.println(finalK);

        //Time Complexity - O(N*N)
        // for(int i=0;i<finalK;i++){
        //     lastElement=nums[nums.length-1];
        //     for(int j=nums.length-1;j>0;j--){
        //         nums[j]=nums[j-1];
        //     }
        //     nums[0]=lastElement;
        // }

        // k=k%nums.length;
        // int []newArr=new int[k];
        // int index=0;
        // for(int i=nums.length-k;i<nums.length;i++){
        //     newArr[index++]=nums[i];
        // }
        // index--;
        // for(int i=nums.length-1;i>=0;i--){
        //     if(i<k){
        //         nums[i]=newArr[i];
        //     }else{
        //         nums[i]=nums[i-k];
        //     }
        // }


        for(int i=0;i<nums.length/2;i++){
            int temp=nums[i];
            nums[i]=nums[nums.length-i-1];
            nums[nums.length-i-1]=temp;
        }

        for(int i=0;i<k/2;i++){
            int temp=nums[i];
            nums[i]=nums[k-i-1];
            nums[k-i-1]=temp;
        }
        for(int i=k;i<k+((nums.length-k)/2);i++){
            System.out.println(i);
            int temp=nums[i];
            nums[i]=nums[nums.length+k-i-1];
            nums[nums.length+k-i-1]=temp;
        }


        for(int i:nums){
            System.out.print(i+", ");
        }
    }
}
