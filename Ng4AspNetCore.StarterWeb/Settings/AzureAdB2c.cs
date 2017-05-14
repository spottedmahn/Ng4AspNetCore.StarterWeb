using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ng4AspNetCore.StarterWeb.Settings
{
	public class AzureAdB2c
	{
		public string TenantId { get; set; }
		public string ClientId { get; set; }
		public string PolicyName { get; set; }
		public string[] Scopes { get; set; }

		public string GetScopes()
		{
			if (Scopes != null || Scopes.Length > 0)
			{
				var sb = new StringBuilder();
				for (int i = 0; i < Scopes.Length; i++)
				{
					sb.Append($"\"{Scopes[i]}\"");

					if (i < Scopes.Length - 1)
					{
						sb.Append(",");
					}
				}

				return sb.ToString();
			}

			return "openid";
		}
	}
}
