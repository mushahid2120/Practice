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
        int lastElement;
        for(int i=0;i<k;i++){
            lastElement=nums[nums.length-1];
            for(int j=nums.length-1;j>0;j--){
                nums[j]=nums[j-1];
            }
            nums[0]=lastElement;
        }
        for(int i:nums){
            System.out.print(i+", ");
        }
    }
}
