package com.bstek.dorado.cloudo.jseditor.iapi;

import org.springframework.util.StringUtils;

public class Identity {
	private String name;
	private String group;
	private String version = LAST_RELEASE;
	
	public static String LAST = "#LAST#";
	public static String LAST_RELEASE = "#LAST_RELEASE#";
	
	public static Identity create(String group, String name) {
		if (!StringUtils.hasLength(group)) {
			throw new IllegalArgumentException(group);
		}
		if (!StringUtils.hasLength(name)) {
			throw new IllegalArgumentException(name);
		}
		
		return new Identity(group, name);
	}
	
	public static Identity create(String group, String name, String version) {
		Identity identity = create(group, name);
		if (!StringUtils.hasLength(version)) {
			throw new IllegalArgumentException(version);
		}
		identity.setVersion(version);
		return identity;
	}
	
	private Identity(String group, String name) {
		this.group = group;
		this.name = name;
	}
	
	public String getName() {
		return name;
	}
	public String getGroup() {
		return group;
	}
	public String getVersion() {
		return version;
	}

	public Identity setVersion(String version) {
		this.version = version;
		return this;
	}

	@Override
	public String toString() {
		return String.format("Identity [name=%s, group=%s, version=%s]", name,
				group, version);
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((group == null) ? 0 : group.hashCode());
		result = prime * result + ((name == null) ? 0 : name.hashCode());
		result = prime * result
				+ ((version == null) ? 0 : version.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Identity other = (Identity) obj;
		if (group == null) {
			if (other.group != null)
				return false;
		} else if (!group.equals(other.group))
			return false;
		if (name == null) {
			if (other.name != null)
				return false;
		} else if (!name.equals(other.name))
			return false;
		if (version == null) {
			if (other.version != null)
				return false;
		} else if (!version.equals(other.version))
			return false;
		return true;
	}
}