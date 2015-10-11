
# local-storage
<blockquote>
<p>A small utility to use local or session storage to store/retrieve data across your app.
The goal of this script is to just provide a very simple api to add/delete/get values from either local or session storage.
The idea here is you will get a unique "table of sorts" for your usage. And all storage goes in this 'table/object'.
There are no bells n' whistles, as most of that is cruft and not used :-)</p>
</blockquote>

# API
A few methods added to the Storage obj prototype. Instantiate a new Storage object, and now you have availability to these methods on your
new object. 

## Object Instatiation  / Usages
<blockquote>
<ul>
     <li>Constructor can take 1 required, 1 optional args: @string.isReqired name, @string type
     <li> name:  Must be supplied to your instantiation. An arbitrary string to denote uniqueness.
     <li> type: defaults to "sessionStorage" if neither "localStorage" or "sessionStorage" is passed.
</ul>
</blockquote>
  With 'name' only.
  <pre><code>
    var Storage = new Storage('Storage') // remember, you could have named it "db__090989" or "somewhereInTime", arbitrary.
  </code></pre>
  With 'name' and 'type'.
  <pre><code>
    var Storage = new Storage('Storage', 'localStorage')
  </code></pre>
## Available Attributes
<pre><code>
    Storage.storageAvailable // @boolean : return for browser support
    Storage.storageType // @string : are you using "localStorage" or "sessionStorage"
</code></pre>

# Available Methods

## Storage.setStorageValue(@array[@object])
<blockquote>
  <ul>
    <li>This method takes an array of objects key:value pairs as you can set more than one value at once.
  </ul>  
</blockquote> 

  <h4>examples</h4>
  <pre><code>
  Storage.setStorageValue([{
    id: 'uyxloyx__nt'
  }]);

  Storage.setStorageValue([{
    id: 'uyxloyx__nt',
    color: 'blue',
    year: 2015,
    age: 100
  }]);
</code></pre>

## Storage.getStorageValue(@string or @array)
<blockquote>
    <ul>
      <li> You have two options here
      <li> Pass in your request args via strings, or as an array
      <li> @string or @array
    </ul>
</blockquote>
<h4>Examples</h4>

A single @string or an @array length of 1, request, will return the value.
<pre><code>
Storage.getStorageValue('color');
# returns @string blue
</code></pre>

A multi @string or an @array length > 1, request, will return an object of key/value pairs
<pre><code>
Storage.getStorageValue('color', 'year', 'age');
# returns @object {color: 'blue', year: 2015, 'age': 100 }

Storage.getStorageValue(['id','year']);
# returns @object {id: 'uyxloyx__nt', age: 100}
</code></pre>
    
## Storage.getStorageDB()
  <blockquote>returns an @object of all stored items within the instance of the created storage api</blockquote>

## Storage.removeStorageValue(@string or @array)
<blockquote>
      <ul>
        <li>removes keys from the storage. The method takes either a @string or an @array
        <li>returns the new storage db sans the removed items
      </ul>  
</blockquote>
<h4>Examples</h4>
<pre><code>
Storage.removeStorageValue('id');
# returns @object {color: 'blue' , year: 2015, age: 100}

Storage.removeStorageValue('id', 'color', 'year');
# returns @object {age: 100}

Storage.removeStorageValue(['id', 'color', 'year']);
# returns @object {age: 100}
</code></pre>

## Storage.getStorageLength()
<blockquote>
      <ul>
        <li>Returns the length of the object. Does not count nested items. Top level only.
      </ul>  
</blockquote>
<h4>Examples</h4>
<pre><code>
Storage.getStorageLength();
# returns 3
</code></pre>

## Storage.clearStorageDB()
  <blockquote>Clears your storage db of values, but otherwise keeps it available for additional updates if needed.</blockquote>
  
## Storage.deleteStorageDB()
<blockquote>Deletes your storage db. It is now gone. Keep in mind your object instance is still around.</blockquote>

## TODO:
tests. coming soon.
