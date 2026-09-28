// Given an integer array nums of size n. Return all elements which appear more than n/3
// times in the array. The output can be returned in any order.

// Example 1:
// Input: nums = [1, 2, 1, 1, 3, 2]
// Output: [1]

// Explanation:
// Here, n / 3 = 6 / 3 = 2.
// Therefore the elements appearing 3 or more times is : [1]

#include <iostream>
#include <vector>
#include <map>
using namespace std;

vector<int> BruteForce(vector<int> arr)
{
    int n = arr.size();
    vector<int> result;
    for (int i = 0; i < n; i++)
    {
        int count = 1;
        for (int j = i + 1; j < n; j++)
        {
            if (arr[j] == arr[i])
            {
                count++;
            }
        }
        if (count > n / 3)
        {
            result.push_back(arr[i]);
        }
    }
    return result;
}

vector<int> Better(vector<int> arr)
{
    map<int, int> freq;
    vector<int> result;
    int n = arr.size();
    for (int i : arr)
    {
        freq[i]++;
    }
    for (auto i : freq)
    {
        if (i.second > n / 3)
        {
            result.push_back(i.first);
        }
    }
    return result;
}

vector<int> Optimal(vector<int> arr)
{
    int n = arr.size(), c1 = 1, v1 = arr[0];
    if (n == 1)
        return {v1};
    int c2 = 1, v2 = arr[1], starting = 1;
    while (starting < n && arr[starting] == v1)
    {
        starting++;
        c1++;
    }
    v2 = arr[starting];
    for (int i = starting + 1; i < n; i++)
    {
        if (arr[i] == v1)
            ++c1;
        else if (arr[i] == v2)
            ++c2;
        else
        {
            --c1;
            --c2;
        }

        if (c1 == -1)
        {
            v1 = arr[i];
            c1 = 1;
        }
        if (c2 == -1)
        {
            while (i < n && arr[i] == v1)
            {
                ++i;
                ++c1;
            }
            if (i == n)
            {
                break;
            }
            if (v2 == arr[i])
                c2 = 2;
            else
                c1 = 1;
            v2 = arr[i];
        }
    }

    c1 = 0;
    c2 = 0;
    for (int i : arr)
    {
        if (i == v1)
            c1++;
        else if (i == v2)
            c2++;
    }
    cout << v1 << ", " << v2;
    if (c2 <= n / 3 && c1 <= n / 3)
        return {};
    if (c2 <= n / 3)
        return {v1};
    if (c1 <= n / 3)
        return {v2};

    if (v1 > v2)
        swap(v1, v2);
    return {v1, v2};
}

int main()
{
    vector<int> arr = {1, 1, 2, 3, 4, 1, 1, 5, 6, 7, 1, 1, 8, 9, 10, 1, 11, 12, 13, 14};
    vector<int> result = Optimal(arr);
    for (int i : result)
    {
        cout << i << ", ";
    }
    return 0;
}