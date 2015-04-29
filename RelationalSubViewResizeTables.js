// Get all subviews from Relational model
subviews = model.getListOfSubviews().toArray();  
for (var isub = 0; isub<subviews.length;isub++){  
    subview = subviews[isub];
    //subview must be visible to resize 
    subview.getPlaceHolder().setVisible(true)
    //resize tables to show all text 
    subview.resizeTables();
    //auto align
    subview.rearrangeT(1,false);
    //Fit the whole diagram to model
    subview.resizeViews();
    //allow changes to be recognized
    subview.setDirty(true);
}