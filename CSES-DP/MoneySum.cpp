/*ॐ Arpit Blagan ॐ*/
#include<bits/stdc++.h>
using namespace std;
#define all(arr) arr.begin(),arr.end()
#define rep(i,s,e) for(int i=s;i<e;i++)
#define lli long long int
#define ll long long
const ll INF=1e18;
const int mod=1e9+7;
//Money Sums CSES DP...
int dp[100005];

int main(){
	ios_base::sync_with_stdio(false);
	cin.tie(nullptr); cout.tie(nullptr);
    int n;cin>>n;vector<int>arr(n);for(int i=0;i<n;i++){cin>>arr[i];}
    int sum=accumulate(arr.begin(),arr.end(),0);
    memset(dp,0,sizeof(dp));dp[0]=1;
    for(int i=0;i<n;i++){
    	for(int j=sum;j>0;j--){
    		if(arr[i]==j){dp[j]=1;}
    		if(j>arr[i]){
    			dp[j]=dp[j]|dp[j-arr[i]];
    		}
    	}
    }vector<int>ans;for(int i=1;i<=sum;i++){
    	if(dp[i]==1){ans.push_back(i);}
    }cout<<ans.size()<<"\n";for(auto it:ans){cout<<it<<" ";}cout<<"\n";
   	return 0;
}