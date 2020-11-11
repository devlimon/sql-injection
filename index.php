<?php include("config/db.php"); ?>
<?php include("config/config.php"); ?>

<?php include('includes/header.php'); ?>

<main>
    <section class="jumbotron shadow-lg p-5" id="contents">
    <h1 class="text-center text-white mb-4 pb-4 mt-5">Welcome to SQL-injection test</h1>
    <div class="row">
      <div class="col-md-4 offset-md-4">
        <!-- search form-->
        <div class="card card-body mb-4">
          <form action="index.php" method="POST">
            <div class="form-group mb-2">
              <input type="text" name="product" class="form-control" value="<?php if(isset($_POST['product'])){echo $_POST['product'];} ?>" placeholder="What Products youu are looking for" autofocus>
            </div>
            <input type="submit" class="btn btn-success btn-block" value="Search">
          </form>
        </div>
      </div>
    </div>
    <?php
      
      
      //if user search,the product list will be shown
      if(!empty($_POST["product"])){ ?>
          <h1 class="text-center text-white mb-4 pb-4">
            Showing results for <b><?php echo $_GET["product"] ?></b> 
          </h1>
          <div class="col-md-12 card card-body">
            <div class="table-responsive">
              <table class="table table-bordered" id="myTable">
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Link</th>
                  </tr>
                </thead>
                <tbody>

                  <?php
                    //getting product list based on search
                    $query = "SELECT title,sub_title,link FROM products WHERE title LIKE '%".$_POST['product']."%'";
                    $result_tasks = mysqli_query($conn, $query);    
                    $num=1;
                    while($row = mysqli_fetch_assoc($result_tasks)) { 
                  ?>
                    <tr>
                      <td class="show-bet cursor-pointer" data="<?php echo $row['ID']; ?>"><?php echo $num; $num++ ?></td>
                      <td class="show-bet cursor-pointer" data="<?php echo $row['ID']; ?>"><?php echo $row['title']; ?></td>
                      <td class="show-bet cursor-pointer" data="<?php echo $row['ID']; ?>"><?php echo $row['sub_title']; ?></td>
                      <td class="show-bet cursor-pointer" data="<?php echo $row['ID']; ?>"><?php echo $row['link']; ?></td>
                    </tr>
                  <?php } ?>
                </tbody>
              </table>
            </div>            
          </div>
      <?php } ?>
    </section>
    <!-- jump to top -->
    <a href="#top" class="btn d-none" id="topbtn"><img src="assets/img/top.png" height="60px"></a>
</main>

<?php include('includes/scripts.php'); ?>

<?php include('includes/footer.php'); ?>



