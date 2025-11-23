<?php

namespace App\Http\Controllers;

use App\Models\ReviewResponse;
use Illuminate\Http\Request;
use App\Models\Review;

class ReviewResponseController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function getReviewsForAdmin()
    {
        // Get reviews without responses
        $unrespondedReviews = Review::where('status', 'completed')->whereDoesntHave('response')->with('service')->get();

        // Get reviews with responses
        $respondedReviews = Review::with(['service', 'response'])->whereHas('response')->get();

        return response()->json([
            'unresponded' => $unrespondedReviews,
            'responded' => $respondedReviews,
        ]);
    }

    public function submitResponse(Request $request, $reviewId)
    {
        $request->validate([
            'responseReview' => 'required|string',
        ]);

        $review = Review::findOrFail($reviewId);
        $response = new ReviewResponse([
            'review_id' => $reviewId,
            'response' => $request->responseReview,
        ]);
        $response->save();
        return response()->json(['message' => 'Response submitted successfully']);
    }

    public function store(Request $request)
    {
        $response = ReviewResponse::create($request->all());
        return response()->json($response, 201);
    }

    public function show($id)
    {
        $response = ReviewResponse::find($id);
        return response()->json($response);
    }

    public function update(Request $request, $id)
    {
        $response = ReviewResponse::find($id);
        $response->update($request->all());
        return response()->json($response);
    }

    public function destroy($id)
    {
        ReviewResponse::destroy($id);
        return response()->json(['message' => 'Deleted successfully']);
    }
}
