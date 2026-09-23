// Input: nums = [1,1,2]
// Output: 2, nums = [1,2,_]
// Explanation: Your function should return k = 2, with the first two elements of nums being 1 and 2 respectively.
// It does not matter what you leave beyond the returned k (hence they are underscores).

public class RemoveDupSortedArray {
    public static void main(String[]args){
        int []nums={0,0,1,1,1,2,2,3,3,4};
        int currentIndex=0;
        for(int i =1;i<nums.length;i++){
            if(nums[currentIndex]!=nums[i]){
                nums[++currentIndex]=nums[i];
            }
        }
        for(int i=0;i<currentIndex;i++){
            System.out.println(nums[i]);
        }
    }
}
