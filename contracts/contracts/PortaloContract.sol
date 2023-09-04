// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.16 <0.9.0;

struct PortaloAddress {
  string name;
  string entity;
  string portaloAddress;
}

struct Profile {
  string profileAlias;
  address owner;
  bool exists;
  PortaloAddress[] cryptoAddresses;
  PortaloAddress[] fiatAddresses;
}

contract PortaloContract {
  mapping(address => string[]) addressToProfileAliases;
  mapping(string => Profile) aliasToProfile;

  function addProfile(Profile calldata profile) public {
    require(!aliasToProfile[profile.profileAlias].exists);

    aliasToProfile[profile.profileAlias] = profile;
    aliasToProfile[profile.profileAlias].owner = msg.sender;
    aliasToProfile[profile.profileAlias].exists = true;

    addressToProfileAliases[msg.sender].push(profile.profileAlias);
  }

  function updateProfile(Profile calldata profile) public {
    require(aliasToProfile[profile.profileAlias].exists);
    require(aliasToProfile[profile.profileAlias].owner == msg.sender);

    aliasToProfile[profile.profileAlias] = profile;
    aliasToProfile[profile.profileAlias].exists = true;
  }

  function getAddressProfiles() public view returns (Profile[] memory) {
    require(addressToProfileAliases[msg.sender].length > 0);

    Profile[] memory profiles = new Profile[](
      addressToProfileAliases[msg.sender].length
    );

    for (uint i = 0; i < addressToProfileAliases[msg.sender].length; i++) {
      profiles[i] = aliasToProfile[addressToProfileAliases[msg.sender][i]];
    }

    return profiles;
  }

  function getProfile(
    string calldata profileAlias
  ) public view returns (Profile memory) {
    require(aliasToProfile[profileAlias].exists);

    return aliasToProfile[profileAlias];
  }
}
