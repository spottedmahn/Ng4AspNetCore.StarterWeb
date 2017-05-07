using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ng4AspNetCore.StarterWeb.Settings
{
	public class AzureAdB2c
	{
		public string TenantName { get; set; }
		public string ClientId { get; set; }
		public string SignInPolicyName { get; set; }
		public string SignInSignUpPolicyName { get; set; }
		public string EditProfilePolicyName { get; set; }
		public string RedirectUri { get; set; }
	}
}
