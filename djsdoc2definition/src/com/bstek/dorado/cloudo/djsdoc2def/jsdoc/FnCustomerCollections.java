package com.bstek.dorado.cloudo.djsdoc2def.jsdoc;

import java.util.ArrayList;
import java.util.List;

import org.codehaus.jackson.JsonNode;

public class FnCustomerCollections extends AbstractFnCustomer {
	private List<IFnCustomer> customers = new ArrayList<IFnCustomer>();
	
	public FnCustomerCollections(BuildContext context) {
		super(context);
	}
	
	@Override
	public Fn custom(Fn fn, JsonNode node, JsonNode self) {
		for (IFnCustomer c: customers) {
			Fn cfn = c.custom(fn, node, self);
			if (cfn != null)
				return cfn;
		}
		return null;
	}
	
	public void add(IFnCustomer... customers) {
		for (IFnCustomer customer: customers) {
			this.customers.add(customer);
		}
	}
}
