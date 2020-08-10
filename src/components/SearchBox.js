import React from 'react';
import search from 'assets/image/search.png';

const SearchBox =(props)=>{
	return(
		<form class="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 navbar-search">
            <div class="input-group">
              <input onChange={props.handleInputSearchChange} type="text" class="form-control bg-light border-0 small" placeholder="Pencarian..." aria-label="Search" aria-describedby="basic-addon2" />
              <div class="input-group-append">
                <button onClick={props.handleClickSearch} class="btn btn-primary" type="button">
                  <img src={search} />
                </button>
              </div>
            </div>
          </form>
	)
}

export default SearchBox;