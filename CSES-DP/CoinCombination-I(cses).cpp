/*ॐ Arpit Blagan ॐ*/
#include<bits/stdc++.h>
using namespace std;
#define all(arr) arr.begin(),arr.end()
#define rep(i,s,e) for(int i=s;i<e;i++)
#define lli long long int
#define ll long long
const ll INF=1e18;
const int mod=1e9+7;

int main(){
	ios_base::sync_with_stdio(false);
	cin.tie(nullptr); cout.tie(nullptr);
	int n,x;cin>>n>>x;
	vector<int>arr(n);for(int i=0;i<n;i++){cin>>arr[i];}
	vector<long long>dp(x+1,0);
	dp[0]=1;
	for(int i=1;i<=x;i++){
		for(int j=0;j<n;j++){
			if(i-arr[j]>=0){
				dp[i]+=dp[i-arr[j]];dp[i]%=mod;
			}
		}
	}
	cout<<dp[x]<<"\n";
	return 0;
}