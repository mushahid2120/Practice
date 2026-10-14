// Given a non-negative integer x, return the square root of x rounded down to the nearest integer.
// The returned integer should be non-negative as well.
// You must not use any built-in exponent function or operator.
// For example, do not use pow(x, 0.5) in c++ or x ** 0.5 in python.

// Example 1:
// Input: x = 4
// Output: 2
// Explanation: The square root of 4 is 2, so we return 2.

#include <iostream>
#include <vector>
using namespace std;

int Optimal(int num)
{
    int low = 1, high = num / 2, mid = 0;
    if (num == 1)
        return 1;
    while (low <= high)
    {
        mid = (low + high) / 2;

        long long sqr = (long long)mid * (long long)mid;
        if (sqr == num)
            return mid;
        else if (sqr > num)
            high = mid - 1;
        else
            low = mid + 1;
    }
    return high;
}

int main()
{
    int x = 200;
    int result = Optimal(x);
    cout << result;
    return 0;
}