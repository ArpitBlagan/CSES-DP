/*ॐ Arpit Blagan ॐ*/
#include<bits/stdc++.h>
using namespace std;
#define all(arr) arr.begin(),arr.end()
#define rep(i,s,e) for(int i=s;i<e;i++)
#define lli long long int
#define ll long long
const ll INF=1e18;
const int mod=1e9+7;
// int dfs(int in,int n,int &x,vector<int>&arr,vector<vector<int>>&dp){
// 	if(x==0){return 1;}
// 	if(in>=n||x<0){return 0;}
// 	if(dp[in][x]!=-1){return dp[in][x];}
// 	int a=dfs(in+1,n,x,arr,dp);
// 	x-=arr[in];
// 	int b=dfs(in,n,x,arr,dp);
// 	x+=arr[in];
// 	return dp[in][x]=a+b;
// }
int main(){
	ios_base::sync_with_stdio(false);
	cin.tie(nullptr); cout.tie(nullptr);
	int n,x;cin>>n>>x;vector<int>arr(n);for(int i=0;i<n;i++){cin>>arr[i];}
	int dp[n+1][x+1];
	dp[0][0]=0;
	for(int i=1;i<=n;i++){
		dp[i][0]=1;
	}
	for(int i=1;i<=x;i++){
		dp[0][i]=0;
	}
	for(int i=1;i<=n;i++){
		for(int j=1;j<=x;j++){
			dp[i][j]=dp[i-1][j];
			if(j>=arr[i-1]){
				dp[i][j]+=dp[i][j-arr[i-1]];
			}
		}
	}cout<<dp[n][x]<<"\n";
	return 0;
}