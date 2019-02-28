package com.reactlibrary;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;

import org.opencv.core.CvType;
import org.opencv.core.Mat;

import org.opencv.android.Utils;
import org.opencv.imgproc.Imgproc;

import android.util.Base64;
import org.opencv.android.Utils;
import android.util.Log;

import org.opencv.imgcodecs.Imgcodecs;

import com.facebook.react.bridge.*;

import java.io.*;


public class RNOpenCvLibraryModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;

    public RNOpenCvLibraryModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "RNOpenCvLibrary";
    }

    
//     @ReactMethod
//     public void isEqual( String a, int b, Callback booleanCallback) {
// //  WritableMap map = new WritableMap();
// //     map.putString("identifier", "asdasd");
// //     map.putString("uuid", "asdasdasdy8qweu");
   
//     return 1;
           
//     }



    @ReactMethod
    public void isEqual1( String a, int b, Callback errorcallback, Callback successcallback) {
        double alpha = 100; 
        double beta = 1000; 
      
        
        try {   
            Mat source = Imgcodecs.imread(a, Imgcodecs.CV_LOAD_IMAGE_COLOR); 
            Imgproc.cvtColor(source, source, Imgproc.COLOR_BGR2GRAY);
            Mat destination = new Mat(source.rows(), source.cols(), source.type()); 
            source.convertTo(destination, -1, alpha, beta); 
        
         Imgproc.equalizeHist( source, destination );
          Imgcodecs.imwrite(a, destination); 
            successcallback.invoke(a);
        } catch (Exception e) { 
            
           errorcallback.invoke(e.getMessage());
        } 
    
    
    }



} 




