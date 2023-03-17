/*ॐ Arpit Blagan ॐ*/
#include<bits/stdc++.h>
using namespace std;
#define all(arr) arr.begin(),arr.end()
#define rep(i,s,e) for(int i=s;i<e;i++)
#define lli long long int
#define ll long long
const ll INF=1e18;
const int mod=1e9+7;const int N=1e5+1;
// ll dp[1001][N];
// int dfs(int in,vector<pair<int,int>>&arr,int &x,ll &pages){
// 	if(x==0){
// 		return pages;
// 	}
// 	if(in==(int)arr.size()){return pages;}
// 	if(dp[in][x]!=-1){return dp[in][x];}
// 	ll a=0,b=0;
// 	if(x>=arr[in].first){
// 		a=dfs(in+1,arr,x,pages)%mod;
// 		x-=arr[in].first;pages+=arr[in].second;
// 		b=dfs(in+1,arr,x,pages)%mod;
// 		x+=arr[in].first;pages-=arr[in].second;
// 	}
// 	else{
// 		a=dfs(in+1,arr,x,pages)%mod;
// 	}
// 	return dp[in][x]=max(a,b);
// }
int main(){
	ios_base::sync_with_stdio(false);
	cin.tie(nullptr); cout.tie(nullptr);
	int n,s;cin>>n>>s;
	vector<int>arr(n),price(n);
	for(int i=0;i<n;i++){
		cin>>arr[i];
	}
	for(int j=0;j<n;j++){
		cin>>price[j];
	}
	int dp[n+1][s+1];memset(dp,0,sizeof(dp));
	for(int i=1;i<=n;i++){
		for(int j=1;j<=s;j++){
			dp[i][j]=dp[i-1][j];
			if(j>=arr[i-1]){
				dp[i][j]=max(dp[i][j],dp[i-1][j-arr[i-1]]+price[i-1]);
			}
		}
	}cout<<dp[n][s]<<"\n";
	return 0;
}