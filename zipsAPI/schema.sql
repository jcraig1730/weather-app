


USE weatherZips;

CREATE TABLE zips (
  id INT NOT NULL AUTO_INCREMENT,
  zip VARCHAR(120),
  lat VARCHAR(120),
  lng VARCHAR(120),
  city VARCHAR(120),
  state_id VARCHAR(120),
  state_name VARCHAR(120),
  zcta VARCHAR(120),
  parent_zcta VARCHAR(120),
  population VARCHAR(120),
  density VARCHAR(120),
  county_fips VARCHAR(120),
  county_name VARCHAR(120),
  all_county_weights VARCHAR(120),
  imprecise VARCHAR(120),
  military VARCHAR(120), 
  timezone VARCHAR(120),
  PRIMARY KEY (id)
)
