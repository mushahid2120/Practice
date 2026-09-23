// Input: nums = [0,1,0,3,12]
// Output: [1,3,12,0,0]
public class MoveZeroToEnd {
    public static void main(String[] args) {
        int[]nums={1};
        int currentPointer=0;
        // for(int i=0;i<nums.length;i++){
        //     if(nums[i]!=0){
        //         nums[currentPointer++]=nums[i];
        //     }
        // }
        // for(int i=currentPointer;i<nums.length;i++){
        //     nums[currentPointer++]=0;
        // }
        for(int i=0;i<nums.length;i++){
            if (nums[i] != 0) {
                int temp=nums[currentPointer];
                nums[currentPointer++] = nums[i];
                nums[i]=temp;
            }
        }
        for(int i:nums){
            System.out.println(i);
        }
    }
}