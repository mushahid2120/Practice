// Input: nums = [3,4,5,1,2]
// Output: true
// Explanation: [1,2,3,4,5] is the original sorted array.
// You can rotate the array by x = 2 positions to begin on the element of value 3: [3,4,5,1,2].
// edgeCases===[5,1,5,1],[1,2,1,1],[10,1,1,10]


public class isSorted {
    public static void main(String[] args) {
        int arr[]={1,2,1,1};
        int smallestIndex=0;
        for(int i=0;i<arr.length;i++){
            if(arr[smallestIndex]>arr[i]){
                smallestIndex=i;
            }
        }
        // if(arr[smallestIndex]==arr[arr.length-1]){
        //     smallestIndex=arr.length-1;
        // }
        int currentIndex=smallestIndex;
        int loopTerminatedIndex=smallestIndex==0?arr.length-1:smallestIndex-1;
        int nextElement;
        while(currentIndex!=loopTerminatedIndex){
            nextElement=currentIndex+1>=arr.length?0:currentIndex+1;
            if(arr[currentIndex]>arr[nextElement] && arr[smallestIndex]!=arr[nextElement]){
                System.out.print(false);
                break;
            }
            currentIndex=nextElement;
        }
        System.out.println(true);
    }
}
