// You are given an array prices where prices[i] is the price of a given stock on the ith day.

// You want to maximize your profit by choosing a single day to buy one stock and 
// choosing a different day in the future to sell that stock.

// Return the maximum profit you can achieve from this transaction.
//  If you cannot achieve any profit, return 0.

// Example 1:

// Input: prices = [7,1,5,3,6,4]
// Output: 5
// Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.
// Note that buying on day 2 and selling on day 1 is not allowed because you must buy before you sell.

#include <iostream>
#include <vector>
using namespace std;

int BruteFroce(vector<int>&arr){
    int n=arr.size(),profit=0,maxProfit=0;
    for(int i=0;i<n;i++){
        profit=0;
        for(int j=i+1;j<n;j++){
            profit=arr[j]-arr[i];
            if(maxProfit<profit){
                maxProfit=profit;
            }
        }
    }
    return maxProfit;
}

int Optimal(vector<int>&arr){
    int n=arr.size(),maxprofit=0;
    int buyStock=0,sellStock=0;
    while(sellStock<n){
        int profit=arr[sellStock]-arr[buyStock];
        if(profit<0){
            buyStock=sellStock;
        }
        if(profit>maxprofit){
            maxprofit=profit;
        }
        sellStock++;
    }
    return maxprofit;
}

int main(){
    vector<int> arr={7,6,4,3,1};
    int result=Optimal(arr);
    cout<<result;
    return 0;
}